import { z } from 'zod';

export function getMaxLengthFromSchema(
  schema: z.ZodObject<any>,
  fieldName: string
): number | undefined {
  const field = schema.shape[fieldName];

  if (!field) {
    return undefined;
  }

  // Handle optional fields - unwrap them first
  let actualField = field;
  if (field._def.typeName === 'ZodOptional') {
    actualField = field._def.innerType;
  }

  // Check if it's a string type
  if (actualField._def.typeName !== 'ZodString') {
    return undefined;
  }

  // Look for max constraint in checks array
  const checks = actualField._def.checks || [];
  const maxCheck = checks.find((check: any) => check.kind === 'max');

  return maxCheck?.value;
}

// Enhanced version that can handle more complex schemas
export function createSchemaFieldExtractor(schema: z.ZodObject<any>) {
  return {
    getMaxLength: (fieldName: string): number | undefined => {
      const field = schema.shape[fieldName];
      if (!field) return undefined;

      // Unwrap optional/nullable fields
      let actualField = field;
      while (
        actualField._def.typeName === 'ZodOptional' ||
        actualField._def.typeName === 'ZodNullable'
      ) {
        actualField = actualField._def.innerType;
      }

      // Check if it's a string type
      if (actualField._def.typeName !== 'ZodString') {
        return undefined;
      }

      // Find max constraint
      const checks = actualField._def.checks || [];
      const maxCheck = checks.find((check: any) => check.kind === 'max');
      return maxCheck?.value;
    },

    getMinLength: (fieldName: string): number | undefined => {
      const field = schema.shape[fieldName];
      if (!field) return undefined;

      let actualField = field;
      while (
        actualField._def.typeName === 'ZodOptional' ||
        actualField._def.typeName === 'ZodNullable'
      ) {
        actualField = actualField._def.innerType;
      }

      if (actualField._def.typeName !== 'ZodString') {
        return undefined;
      }

      const checks = actualField._def.checks || [];
      const minCheck = checks.find((check: any) => check.kind === 'min');
      return minCheck?.value;
    },

    isRequired: (fieldName: string): boolean => {
      const field = schema.shape[fieldName];
      return field && !field.isOptional();
    },

    getAllFieldConstraints: () => {
      const constraints: Record<
        string,
        {
          maxLength?: number;
          minLength?: number;
          isRequired: boolean;
        }
      > = {};

      Object.keys(schema.shape).forEach((fieldName) => {
        constraints[fieldName] = {
          maxLength: getMaxLengthFromSchema(schema, fieldName),
          minLength: undefined, // You can extend this
          isRequired: !schema.shape[fieldName].isOptional(),
        };
      });

      return constraints;
    },
  };
}

export class FormErrorMapper {
  /**
   * Convert backend errors (snake_case keys) to frontend (camelCase) keys
   * Example: { first_name: ['Required'] } → { firstName: ['Required'] }
   */
  static toCamelCase(errors: Record<string, string[]>): Record<string, string[]> {
    const result: Record<string, string[]> = {};

    Object.keys(errors).forEach((key) => {
      const camelKey = FormErrorMapper.snakeToCamel(key);
      result[camelKey] = errors[key];
    });

    return result;
  }

  private static snakeToCamel(s: string): string {
    return s.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }
}
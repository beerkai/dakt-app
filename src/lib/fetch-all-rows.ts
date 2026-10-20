type PageResult<T> = {
  data: T[] | null;
  error: { message: string } | null;
};

/** PostgREST varsayılan 1000 satır tavanını aşmak için sayfalı okuma. */
export async function fetchAllRows<T>(
  fetchPage: (from: number, to: number) => PromiseLike<PageResult<T>>,
): Promise<T[]> {
  const size = 1000;
  const rows: T[] = [];
  for (let from = 0; ; from += size) {
    const { data, error } = await fetchPage(from, from + size - 1);
    if (error) throw new Error(error.message);
    const batch = data ?? [];
    rows.push(...batch);
    if (batch.length < size) return rows;
  }
}

export const formatDateYear = (dateString?: string) => {
  if (!dateString) return '';
  // Extrai só a parte da data, sem considerar fuso
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return '';
  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
};
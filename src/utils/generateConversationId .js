export const generateConversationId = (userId1, userId2) => {
  // Gunakan sort untuk memastikan urutan yang konsisten
  const sortedIds = [userId1, userId2].sort();
  // Gabungkan ID pengguna dengan "-" sebagai pemisah
  return `${sortedIds[0]}-${sortedIds[1]}`;
};

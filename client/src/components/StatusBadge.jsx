function StatusBadge({ status }) {
  const styles = {
    New: "bg-yellow-100 text-yellow-700",
    Contacted: "bg-blue-100 text-blue-700",
    Closed: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
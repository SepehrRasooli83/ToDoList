import Link from "next/link";

export default function Home() {
  const data = [
    { number: 1, description: "Push Up" },
    { number: 2, description: "Read a book" },
    { number: 3, description: "Get to work" },
  ];

  return (
    <>
      <div style={{ padding: "20px" }}>
        <button
          style={{ padding: "10px", color: "green", border: "2px solid green" }}
        >
          <Link href={"/create"}>Create New</Link>
        </button>
      </div>
      <div style={{ padding: "10px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Number
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.number}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.number}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.description}
                  <button style={{ padding: "5px", color: "red" }}>
                    Delete
                  </button>
                  <button style={{ padding: "5px", color: "orange" }}>
                    <Link href={"/edit"}>Edit</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

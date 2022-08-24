import React from "react";
import Link from "next/link";

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <p>404 PAGE</p>
      <Link href="/">Home Page</Link>
    </div>
  );
};

export default NotFoundPage;

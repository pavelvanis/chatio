import Link from "next/link";

const NotFound = () => {
  return (
    <main className="h-full flex justify-center items-center">
      <div className="text-center">
        <h1 className="mb-2">Not Found</h1>
        <Link className=" text-sm" href="/">Go home</Link>
      </div>
    </main>
  );
};

export default NotFound;

import React from "react";
import Link from "next/link";

const Sidebar = () => {
	return (
		<div className="bg-blue-600 text-white w-64 h-screen flex flex-col w-[18%]">
			{/* <h2 className="text-2xl font-bold text-center p-4">Metallic</h2> */}
			<ul className="flex-grow">
				<li className="p-4 hover:bg-blue-700">
					<Link href="/">Dashboard</Link>
				</li>
				<li className="p-4 hover:bg-blue-700">
					<Link href="/inbox">Inbox</Link>
				</li>
				<li className="p-4 hover:bg-blue-700">
					<Link href="/customers">Customers</Link>
				</li>
				<li className="p-4 hover:bg-blue-700">
					<Link href="/tickets">Tickets</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;

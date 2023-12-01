"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineBookmark } from "react-icons/hi";

export default function Sidebar() {
	const path = usePathname();
	const isActive = (pathname: string) => path.startsWith(pathname);

	return (
		<div className="relative md:border-b border-default">
			<div className="grid max-md:grid-flow-col w-full gap-4 md:w-16 md:sticky md:top-10">
				<Link href={"/books"} className={clsx("node h-16", { "active-node": isActive("/books") })}>
					<Image className="w-12 h-12 object-contain" alt="Lore Books" src="/Lore Logo.png" width={80} height={80} />
				</Link>
				<Link href={"/armor"} className={clsx("node h-16", { "active-node": isActive("/armor") })}>
					<Image className="w-14 h-14 object-contain" alt="Armors" src="/Armors.png" width={80} height={80} />
				</Link>
				<Link href={"/bookmark"} className={clsx("node h-16", { "active-node": isActive("/bookmark") })}>
					<HiOutlineBookmark className="w-12 h-12 object-contain" />
				</Link>
			</div>
		</div>
	);
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
	const router = useRouter();

	useEffect(() => {
		router.push("/books");
	}, []);

	return <div className="header center">D2 Lore</div>;
}
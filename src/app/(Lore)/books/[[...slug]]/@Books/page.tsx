"use client";

import useBooks from "@/src/hooks/books/useBooks";
import useImageLoad from "@/src/hooks/useImageLoad";
import clsx from "clsx";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { bookmarkSVG } from "@/src/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import Link from "next/link";
import { getFirstChildOfNode, getFirstNode } from "@/src/utils/GetFirst";

export default function Books({ params }: { params: { slug: string[] } }) {
	const nodeSlug = Number(params?.slug?.[0]) || 0;
	const bookSlug = Number(params?.slug?.[1]) || 0;
	const node = nodeSlug || getFirstNode(4077680549);
	const book = bookSlug || getFirstChildOfNode(node);

	const books = useBooks(node);
	const { isImageLoaded, handleImageLoad } = useImageLoad();
	const bookmarks = useSelector((state: RootState) => state.bookmarks.bookmarks);
	const reads = useSelector((state: RootState) => state.reads.reads);

	return (
		<div className="grid grid-cols-3 gap-4">
			{books?.map((bookDiff, index) => {
				const bookHash = bookDiff?.hash || 0;
				const bookmarked = bookmarks.find((bookmark) => bookmark.book == bookHash);
				const name = bookDiff?.displayProperties.name || "read";

				const currentBookRecords = bookDiff?.children.records.length;
				const currentBookReads = reads.filter((read) => read.book == bookHash).length;
				const read = currentBookReads == currentBookRecords;

				return (
					<Link key={bookHash} href={`/books/${node}/${bookHash}`}>
						<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }} className="relative book">
							<Image unoptimized quality={100} onLoad={() => handleImageLoad(bookHash)} src={`https://www.bungie.net${bookDiff?.displayProperties.iconSequences?.[1].frames[0]}`} width={359} height={460} alt={name} className={clsx("book", { "opacity-100": isImageLoaded[bookHash], "opacity-0": !isImageLoaded[bookHash] })} />
							<AnimatePresence>{read && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute w-8 h-8 -left-4 -top-4 opacity-90 bg-warning rotate-45"></motion.div>}</AnimatePresence>
							<AnimatePresence>
								{bookmarked && (
									<motion.div style={{ overflow: "hidden" }} initial={{ height: 0 }} animate={{ height: 100 }} exit={{ height: 0 }} transition={{ duration: 0.5 }} className="absolute w-4 right-2 top-0 opacity-90">
										<Image src={bookmarkSVG} width={1080} height={1080} alt="bookmark" />
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
						<div className={clsx("w-full h-1 rounded-full bg-default-100 mt-2 opacity-0 transition-opacity duration-300", { "opacity-100": book == bookHash })}></div>
					</Link>
				);
			})}
		</div>
	);
}

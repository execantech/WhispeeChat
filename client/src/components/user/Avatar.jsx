export default function Avatar({ username, size, color }) {
	return (
		<div
			className={`flex items-center justify-center uppercase font-normal select-none
      text-white rounded-full cursor-pointer hover:shadow group-hover:shadow
      ${color || "bg-primary"}
      ${size ? `h-${size} w-${size}` : "h-8 w-8"}`}>
			{username !== undefined ? username[0] : ""}
		</div>
	);
}

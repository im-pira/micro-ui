import ASCIIVideoRenderer from "./ASCIIVideoRenderer";

export default function AbstractASCII() {
    return (
        <ASCIIVideoRenderer
            src="/ascii/smoke.mov"
            chars=".+/7135"
            color="#6f6cff"
            cellSize={6}
            threshold={35}
        />
    );
}
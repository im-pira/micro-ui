import ASCIIVideoRenderer from "./ASCIIVideoRenderer";

export default function AbstractASCII() {
    return (
        <ASCIIVideoRenderer
            src="/ascii/smoke.mov"
            chars=".+/7135"
            color="#6f6cff"
            cellSize={4}
            threshold={25}
        />
    );
}
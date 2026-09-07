import ASCIIVideoRenderer from "./ASCIIVideoRenderer";

export default function FishASCII() {
    return (
        <ASCIIVideoRenderer
            src="/ascii/fish.mov"
            chars="01"
            color="#333"
            cellSize={7}
            threshold={55}
        />
    );
}
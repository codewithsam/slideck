import { Protect } from "@clerk/nextjs";

export default function Slides({ params }: { params: { deckId: string } }) {
  const { deckId } = params;
  return (
    <Protect>
      <div className="page-header p-8">deck id: {deckId}</div>
    </Protect>
  );
}

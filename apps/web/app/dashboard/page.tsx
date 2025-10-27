import { Protect } from "@clerk/nextjs";
import { Room } from "@/app/Room";
import { CollaborativeApp } from "@/app/CollaborativeApp";

export default function Dashboard() {
  return (
    <Protect>
      <Room>
        <CollaborativeApp />
      </Room>
    </Protect>
  );
}

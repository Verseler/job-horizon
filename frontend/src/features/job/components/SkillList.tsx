import { Badge } from "@/components/ui/Badge";
import type { Job } from "@/features/job";
import { colorPool } from "@/lib/colorPool";

export default function SkillList({ list }: { list: Job["skills"] }) {
  if (list.length <= 0) return;

  return (
    <ul className="flex flex-wrap items-center gap-2 pb-6">
      {list?.map((skill, index) => (
        <li key={skill}>
          <Badge
            className={`${colorPool[index].background} ${colorPool[index].text}`}
          >
            {skill}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

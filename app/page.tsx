import CurriculumRenderer from '../components/CurriculumRenderer';
import { mockCurriculum } from '../data/mockCurriculum';

export default function Home() {
  return (
    <main>
      <CurriculumRenderer data={mockCurriculum} />
    </main>
  );
}
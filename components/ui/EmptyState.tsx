import { FaGithub } from "react-icons/fa";

export default function EmptyState() {
  return (
    <div className='flex justify-center items-center h-[400px]'>
      <div className='text-center'>
        <FaGithub size={48} className='mx-auto mb-4 text-primary'/>
        <h2 className='text-xl font-semibold text-heading mb-2'>
          GitSight
        </h2>
        <p className='text-sm text-muted'>
          Enter a GitHub username above to get started.
        </p>
      </div>
    </div>
  );
}


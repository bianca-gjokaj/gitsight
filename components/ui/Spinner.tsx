export default function Spinner({message = 'Loading...'}: {message?: string}) {
  return (
    <div className="flex justify-center items-center h-72">
      <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-[3px] border-border border-t-primary rounded-full animate-spinner"/>
        <span className="text-sm text-muted">{message}</span>
      </div>
    </div>
  );
}
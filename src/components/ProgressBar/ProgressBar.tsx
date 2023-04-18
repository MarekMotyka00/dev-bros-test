type Props = {
  progressPercentage: number;
};

const ProgressBar = (props: Props) => {
  const { progressPercentage } = props;
  return (
    <div className='h-10 max-w-[300px] bg-[#FF3E4E1A] rounded-lg w-full'>
      <div style={{ width: `${progressPercentage}%` }} className={`h-full bg-[#FF3E4E] rounded-lg flex items-center pl-4`}>
        <span className='text-white'>{progressPercentage}</span>
      </div>
    </div>
  );
};

export default ProgressBar;

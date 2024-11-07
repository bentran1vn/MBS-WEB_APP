interface Config {
  configNo: string
  configName: string
  configValue: string
  configStatus: string
}

export default function ConfigTableItem(props: Config) {
  return (
    <>
      <div
        className='bg-gray-100/80 h-[46px] mb-4 px-4 grid grid-cols-12 text-center rounded-xl items-center'
        key={'1'}
      >
        <div className='col-span-1 pl-4'>{props.configNo}</div>
        <div className='col-span-4'>{props.configName}</div>
        <div className='col-span-2'>{props.configValue}</div>
        <div className='col-span-2'>{props.configStatus}</div>
        <div className='col-span-2 grid grid-cols-4 gap-2'>
          <div className='col-span-2 bg-blue-500 text-white p-2 rounded'>Edit</div>
          <div className='col-span-2 bg-red-500 text-white p-2 rounded'>Remove</div>
        </div>
      </div>
    </>
  )
}

import { Button, DatePicker } from '@nextui-org/react'
import { Form } from 'src/types/form.type'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { FormSchema, formSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { parseDate } from '@internationalized/date'
import { handleDate } from 'src/utils/utils'
import ApprovalFormItem from 'src/pages/Approval/ApprovalForm/ApprovalFormItem'

type FormData = Pick<FormSchema, 'response'> & {
  formID?: string
  isApprove?: boolean
}

const schema = formSchema.pick(['response'])

export default function ApprovalForm({ form }: { form: Form | undefined }) {
  const [isApprove, setIsApprove] = useState<boolean | 'empty'>('empty')

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    defaultValues: {
      response: '',
      formID: form?.id
    },
    resolver: yupResolver(schema)
  })

  const onSubmit = (isApprove: boolean) =>
    handleSubmit((data) => {
      setIsApprove(isApprove)
      setValue('isApprove', isApprove)
      setValue('formID', form?.id)
      console.log(data)
    })

  return (
    form != undefined && (
      <form className='grid grid-cols-5 grid-rows-12 gap-2 h-full'>
        <div className='grid row-span-8 col-span-5 border border-slate-300 px-4 rounded-md mb-2'>
          <div className=' p-4 flex justify-center items-center'>
            <div className=' h-[100px] w-[100px]'>
              <img
                className='h-full w-full rounded-full shadow-lg'
                src={form?.employee?.avatarUrl || 'https://lh3.google.com/u/0/d/1cA_e2CcO33m9Tzj4GbRMekWel9u20JGs'}
                alt='EmployeePicture'
              />
            </div>
          </div>
          <div className='space-y-7'>
            <ApprovalFormItem label='Full name' value={form?.employee?.fullName} />
            <ApprovalFormItem label='Email' value={form?.employee?.email} />
            <ApprovalFormItem label='Phone' value={form?.employee?.phoneNumber} />
            <ApprovalFormItem label='Absent Reason' value={form?.reason} />
          </div>
        </div>
        <div className='grid row-span-3 col-span-5 border border-slate-300 px-4 rounded-md space-y-4 h-full'>
          <div className='space-y-8 mt-6'>
            <div className='grid grid-cols-10'>
              <div className='col-span-3 text-lg font-normal mt-2'>Date of absent</div>
              <DatePicker
                value={parseDate(handleDate(new Date(form?.date as Date)))}
                isReadOnly
                className='col-end-11 col-span-7'
              />
            </div>
            <div className='flex'>
              <div className='w-[30%] text-lg font-normal mr-8 mt-2'>Form Response</div>
              <div className='w-[83%]'>
                <Input
                  register={register}
                  name='response'
                  placeholder='Form Response'
                  errorMessage={errors.response?.message}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=' row-span-1 col-span-5 flex'>
          <Button
            type='submit'
            onClick={onSubmit(true)}
            className='bg-gray-400/50 hover:bg-gray-400/30 text-white w-[200px] mr-8 rounded-lg hover:text-gray-600'
            isLoading={true}
            disabled={isApprove != 'empty' && !isApprove}
          >
            Submit
          </Button>
          <Button
            type='submit'
            onClick={onSubmit(false)}
            className='bg-gray-400/50 hover:bg-gray-400/30 text-white w-[200px] rounded-lg hover:text-gray-600'
            isLoading={true}
            disabled={isApprove != 'empty' && isApprove}
          >
            Reject
          </Button>
        </div>
      </form>
    )
  )
}

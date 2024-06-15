'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Info, Loader, Rocket } from 'lucide-react';
import { convert } from 'url-slug';

import { Button } from '@/components/ui/button';
import TextInput from '@/components/TextInput';
import { Input } from '@/components/ui/input';
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from '@/components/ui/tooltip';
import { useAPIMutation } from '@/lib/useAPIMutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  name: yup.string().trim().required('Project name is required'),
});

const defaultValues = {
  name: '',
};

export function CreateProjectForm() {
  const router = useRouter();
  const { isPending, mutate } = useAPIMutation(api.project.create);

  const { control, handleSubmit, watch, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = async (formData: { name: string }) => {
    try {
      const res = await mutate({
        name: formData.name,
        slug: convert(formData.name),
      });
      console.log(res);
      reset({ name: '' });
      toast.success('New project created successfully');
      // router.push(`/dashboard/${res}`);
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  const projectName = watch('name');

  return (
    <div className='w-full md:max-w-md p-6 rounded-lg shadow-md bg-card border border-secondary sticky top-8'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold'>
            Build features according to Users, not PM 😜
          </h2>
          <div className='space-y-2'>
            <TextInput
              control={control}
              name='name'
              label='Project Name'
              placeholder='Enter you project name'
            />
          </div>
          <div>
            <p className='text-sm font-medium text-secondary-foreground mb-2 text-left flex gap-1 items-center'>
              Slug{' '}
              <Tooltip>
                <TooltipTrigger>
                  <Info className='w-4 h-4 text-secondary-foreground cursor-pointer' />
                </TooltipTrigger>
                <TooltipContent side='right'>
                  <p className='p-2'>
                    This is auto generated field <br /> you don&apos;t have to
                    input slug value
                  </p>
                </TooltipContent>
              </Tooltip>
            </p>
            <Input
              className='w-full h-full px-3 py-3 sm:text-base border border-secondary'
              disabled
              placeholder='Project Slug'
              value={convert(projectName)}
            />
          </div>

          <Button
            type='submit'
            variant='default'
            size='lg'
            className='group'
            disabled={isPending}
          >
            {!isPending ? (
              <>
                {' '}
                Submit{' '}
                <Rocket className='w-5 h-5 ml-1 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform' />
              </>
            ) : (
              <Loader className='w-5 h-5 animate-spin' />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

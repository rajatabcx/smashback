'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Loader, Rocket } from 'lucide-react';

import { Button } from '@/components/ui/button';
import TextInput from '@/components/TextInput';
import { useAPIMutation } from '@/lib/useAPIMutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';
import { SigninModal } from '@/components/SigninModal';
import { usePostHog } from 'posthog-js/react';

const schema = yup.object().shape({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().required('Description is required'),
  pledgeAmount: yup.string().matches(/^\d*$/, 'Must be a number'),
});

const defaultValues = {
  title: '',
  description: '',
  pledgeAmount: '',
};

interface PropTypes {
  projectId: Id<'projects'>;
}

export function CreateFeedbackForm({ projectId }: PropTypes) {
  const posthog = usePostHog();
  const [modalOpen, setModalOpen] = useState(false);
  const { sessionId } = useAuth();

  const router = useRouter();
  const { isPending, mutate } = useAPIMutation(api.feedback.create);

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = async (formData: {
    title: string;
    description: string;
    pledgeAmount?: string;
  }) => {
    try {
      if (!sessionId) {
        setModalOpen(true);
        return;
      }
      const res = await mutate({
        title: formData.title,
        description: formData.description,
        pledgeAmount: formData.pledgeAmount ? Number(formData.pledgeAmount) : 0,
        projectId,
      });
      posthog.capture('feedback_created', {
        title: formData.title,
        description: formData.description,
        pledgeAmount: formData.pledgeAmount ? Number(formData.pledgeAmount) : 0,
        projectId,
      });
      reset({ title: '', description: '', pledgeAmount: '' });
      toast.success('New feedback created successfully');
      router.push(`/f/${projectId}/${res}`);
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message);
    }
  };

  return (
    <>
      <div className='w-full md:max-w-md p-6 rounded-lg shadow-md bg-card border border-secondary sticky top-8'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold'>Suggest a Feature</h2>
            <div className='space-y-2'>
              <TextInput
                control={control}
                name='title'
                label='Title'
                placeholder='Enter the title'
              />
            </div>

            <div className='space-y-2'>
              <TextInput
                control={control}
                name='description'
                label='Description'
                placeholder='Enter the description'
              />
            </div>

            <div className='space-y-2'>
              <TextInput
                control={control}
                name='pledgeAmount'
                label='Pledge Amount (Optional)'
                placeholder='Enter the pledge amount'
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
      <SigninModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}

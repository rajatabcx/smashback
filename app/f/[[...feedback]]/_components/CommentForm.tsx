'use client';

import { SigninModal } from '@/components/SigninModal';
import TextInput from '@/components/TextInput';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useAPIMutation } from '@/lib/useAPIMutation';
import { useAuth } from '@clerk/nextjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as yup from 'yup';

const schema = yup.object().shape({
  comment: yup.string().trim().required('Comment is required'),
});

const defaultValues = {
  comment: '',
};

interface PropTypes {
  feedbackId: Id<'feedbacks'>;
}

export function CommentForm({ feedbackId }: PropTypes) {
  const [modalOpen, setModalOpen] = useState(false);
  const { sessionId } = useAuth();
  const { isPending, mutate } = useAPIMutation(api.comment.create);

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = async (formData: { comment: string }) => {
    try {
      if (!sessionId) {
        console.log(sessionId);
        setModalOpen(true);
        return;
      }
      await mutate({
        comment: formData.comment,
        feedbackId,
      });
      reset({
        comment: '',
      });
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-2 items-start'>
        <TextInput
          control={control}
          name='comment'
          placeholder='Leave a comment'
          className='flex-1'
        />
        <Button disabled={isPending}>
          {isPending ? <Loader className='w-4 h-4 animate-spin' /> : 'Submit'}
        </Button>
      </div>
      <SigninModal open={modalOpen} setOpen={setModalOpen} />
    </form>
  );
}

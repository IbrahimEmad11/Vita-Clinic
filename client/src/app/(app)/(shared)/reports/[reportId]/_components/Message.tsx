import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { Bot, User } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { Message as MessageType } from '@/types/appointments.type';

interface MessageProps {
  message:
    | MessageType
    | {
        id: string;
        createdAt: string;
        isUserMessage: boolean;
        message: JSX.Element;
      };
  isNextMessageSamePerson: boolean;
}

export default function Message({
  message,
  isNextMessageSamePerson,
}: MessageProps) {
  return (
    <div
      className={cn('flex items-end', {
        'justify-end': message.isUserMessage,
      })}
    >
      <div
        className={cn(
          'relative flex aspect-square h-6 w-6 items-center justify-center',
          {
            'order-2 rounded-sm bg-blue-600': message.isUserMessage,
            'order-1 rounded-sm bg-zinc-800': !message.isUserMessage,
            invisible: isNextMessageSamePerson,
          }
        )}
      >
        {message.isUserMessage ? (
          <User className="h-3/4 w-3/4 fill-zinc-200 text-zinc-200" />
        ) : (
          <Bot className="h-3/4 w-3/4 fill-zinc-300 dark:fill-black" />
        )}
      </div>

      <div
        className={cn('mx-2 flex max-w-md flex-col space-y-2 text-base', {
          'order-1 items-end': message.isUserMessage,
          'order-2 items-start': !message.isUserMessage,
        })}
      >
        <div
          className={cn('inline-block rounded-lg px-4 py-2', {
            'bg-blue-600 text-gray-50': message.isUserMessage,
            'bg-gray-200 text-gray-900 dark:bg-gray-300':
              !message.isUserMessage,
            'rounded-br-none':
              !isNextMessageSamePerson && message.isUserMessage,
            'rounded-bl-none':
              !isNextMessageSamePerson && !message.isUserMessage,
          })}
        >
          {typeof message.message === 'string' ? (
            <ReactMarkdown
              className={cn('prose', {
                'text-zinc-50': message.isUserMessage,
              })}
            >
              {message.message}
            </ReactMarkdown>
          ) : (
            message.message
          )}
          {message.id !== 'loading-message' && (
            <div
              className={cn('mt-2 w-full select-none text-right text-xs', {
                'text-zinc-500': !message.isUserMessage,
                'text-blue-300': message.isUserMessage,
              })}
            >
              {format(new Date(message.createdAt), 'HH:mm')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

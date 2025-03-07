'use client'

import useOnKeyPress from "@/hooks/useOnKeyPress"
import { cn } from "@/utils"
import { ReactNode } from "react"
import { createPortal } from "react-dom"
import IconButton from "./IconButton"

interface ModalProps {
    title: string
    children: ReactNode
    size?: 'default' | 'big'
    titleClasses?: string,
    childrenClasses?: string,
    isOpen: boolean
    onClose: VoidFunction
}

const Modal = ({
    title,
    children,
    size = 'default',
    titleClasses,
    childrenClasses,
    isOpen,
    onClose
}: ModalProps) => {
    useOnKeyPress({ key: 'Escape' }, onClose)

    if (!isOpen) return null

    return createPortal(
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/25'
            onClick={onClose}
        >
            <div
                className={cn(
                    'relative p-5 w-[90%] flex flex-col gap-4 bg-background rounded-xl lg:rounded-2xl shadow-lg',
                    size === 'big' ? 'max-w-2xl' : 'max-w-lg')}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={cn('flex items-center justify-between font-semibold', titleClasses)}>
                    <h3>{title}</h3>
                    <IconButton icon='tabler:x' onClick={onClose} className='absolute top-3 right-3 text-xl' />
                </div>
                <div className={cn('overflow-auto max-h-[70vh]', childrenClasses)}>{children}</div>
            </div>
        </div>,
        document.body
    )
}

export default Modal

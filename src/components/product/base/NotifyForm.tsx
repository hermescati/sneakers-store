import Button from "@/components/base/Button"
import Input from "@/components/base/input/Input"

const NotifyForm = () => {
    return (
        <div className="flex flex-col gap-3">
            <p className="font-medium text-primary-700">
                Enter your email and size to be notified when it&apos;s back in stock.
            </p>

            <div className='flex flex-col gap-y-3'>
                <Input
                    type="email"
                    label='Email'
                    placeholder="e.g. you@example.com" />
                <Input
                    type="number"
                    label='Size (US)'
                    placeholder="e.g. 9.5"
                    min={3.5}
                    max={18}
                    step={0.5}
                />
                <Button
                    label="Notify me"
                    iconPrepend="gravity-ui:bell-dot"
                    className="w-full mt-2"
                />
            </div>
        </div>
    )
}

export default NotifyForm
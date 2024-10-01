import Button from "@/components/base/Button";
import Input from "@/components/base/Input";
import MainContainer from "@/components/MainContainer";

export default function Home() {
  return (
    <MainContainer>
      <div className="py-20 mx-auto text-center flex flex-col gap-4 items-center max-w-3xl">
        <p>Button Systems</p>
        <div className="flex gap-2">
          <Button label="Hello there" disabled />
          <Button
            variant="primary"
            href="https://google.com"
            label="Hello there"
            iconAppend="tabler:arrow-right"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" label="Hello there" />
          <Button
            href="https://google.com"
            variant="secondary"
            label="Hello there"
            iconAppend="tabler:arrow-right"
          />
        </div>
      </div>
      <div className="py-20 mx-auto text-center flex flex-col gap-4 items-center max-w-3xl">
        <p>Input Systems</p>
        <Input
          label="Disabled"
          placeholder="Type text here"
          hint="Hint text here"
          disabled
        />
        <Input
          label="Small"
          placeholder="Type text here"
          hint="Hint text here"
          inputSize="small"
        />
        <Input
          label="Default"
          placeholder="Type text here"
          hint="Hint text here"
        />
        <Input
          required
          label="Invalid"
          placeholder="Type text here"
          invalid
          invalidMessage="Error message"
          hint="Hint text here"
        />
      </div>
    </MainContainer>
  );
}

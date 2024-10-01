import Button from "@/components/base/Button";
import MainContainer from "@/components/MainContainer";

export default function Home() {
  return (
    <MainContainer>
      <div className="py-20 mx-auto text-center flex flex-col gap-4 items-center max-w-3xl">
        <p>Button Systems</p>
        <div className="flex gap-2">
          <Button label="Hello there" />
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
    </MainContainer>
  );
}

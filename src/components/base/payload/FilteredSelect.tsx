import { Model } from "@/types/payload";
import { SelectInput, useField } from "payload/components/forms";
import * as React from "react";

export const FilteredSelect: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = React.useState([]);

  const brandField = useField({ path: "brand" });
  const selectedBrand = brandField.value || null;

  React.useEffect(() => {
    if (selectedBrand) {
      const fetchModels = async () => {
        try {
          const response = await fetch(
            `/api/models?where[brand][equals]=${selectedBrand}&limit=100`
          );
          const { docs: data } = await response.json();
          const sortedModels = data.sort((a: Model, b: Model) =>
            a.name.localeCompare(b.name, undefined, {
              numeric: true,
              sensitivity: "base",
            })
          );

          setOptions(sortedModels);
        } catch (error) {
          console.error("Error fetching models", error);
        }
      };
      fetchModels();
    }
  }, [selectedBrand]);

  return (
    <div className="field-type relationship">
      <label className="field-label">
        Model
        <span className="required">*</span>
      </label>
      <SelectInput
        path={path}
        name={path}
        options={options.map((model: { name: string; id: string }) => ({
          label: model.name,
          value: model.id,
        }))}
        value={value}
        onChange={(e) => {
          if (e && e.value !== undefined && e.value !== null) {
            setValue(e.value);
          } else {
            setValue("");
          }
        }}
        required
      />
    </div>
  );
};

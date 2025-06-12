import React, { useState } from 'react';
import { AffirmationCategory } from '~/lib/constants/affirmation';
import { formatCategory } from '~/lib/utils/formatCategory';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function CategorySelect({
  category,
  setCategory,
  className,
}: {
  category: AffirmationCategory;
  setCategory: React.Dispatch<React.SetStateAction<AffirmationCategory>>;
  className?: string;
}) {
  const [triggerWidth, setTriggerWidth] = useState(0);

  const onTriggerLayout = (event: any) => {
    setTriggerWidth(event.nativeEvent.layout.width);
  };

  return (
    <Select
      className={className}
      value={{
        value: category,
        label: formatCategory(category),
      }}
      onValueChange={(el) => setCategory(el?.value as AffirmationCategory)}
    >
      <SelectTrigger onLayout={onTriggerLayout}>
        <SelectValue
          className="native:text-lg text-sm text-foreground"
          placeholder="Select a category"
        />
      </SelectTrigger>

      <SelectContent className="h-80" style={{ width: triggerWidth }}>
        {Object.values(AffirmationCategory).map((cat) => (
          <SelectItem key={cat} label={formatCategory(cat)} value={cat}>
            {formatCategory(cat)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

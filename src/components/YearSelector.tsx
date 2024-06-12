import { Select } from "@chakra-ui/react";
import Event from "@/Interfaces/EventInterface";
import themes from "@/utils/themes";

const YearSelector: React.FC<{ onSelectYear: (year: number) => void,eventdata:Event[] }> = ({ onSelectYear,eventdata }) => {
    const years = Array.from(new Set(eventdata.map(event => new Date(event.event_start_date).getFullYear())));
    return (
      <Select placeholder="Select year" alignSelf={"flex-start"} borderColor={themes.colors.tertiary['0']} width={"20%"} onChange={(e) => onSelectYear(parseInt(e.target.value))}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
    );
  };

  export default YearSelector;
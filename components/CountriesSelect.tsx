import { getAllCountries } from "@/lib/data";

async function CountriesSelect() {
  const countries = await getAllCountries();

  return (
    <div className="mt-4">
      <select className="p-2 bg-white border border-gray-300 rounded-md">
        <option value="">Select a country</option>
        {countries.map((country: any) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountriesSelect;

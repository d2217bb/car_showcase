/*
import { CarProps, FilterProps } from "@/types";
import cars from "@/utils/cars.json";

export async function fetchCars(filters: FilterProps) {

    const {manufacturer, year, model, limit, fuel} = filters;

    const  headers = { 
            'x-rapidapi-key': '9f03b8a2e6msh59370afec175690p1e7e94jsnedf3be4c4f19',
            'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com',
          
    }
    const response = await fetch(
        `https://68b9ae2b6aaf059a5b587407.mockapi.io/api/v1/cars?manufacturer=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
        {
          headers: headers
        }
      );
    
    const result = await response.json();

    return result;
    
}
*/

import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel_type } = filters;

  const response = await fetch(
    "https://68b9ae2b6aaf059a5b587407.mockapi.io/api/v1/cars"
  );

  let result: CarProps[] = await response.json();
  console.log(result);
  console.log(filters);

  // aplicăm filtrările manual
  if (manufacturer) {
    result = result.filter((car) =>
      car.make.toLowerCase() === manufacturer.toLowerCase()
    );
  }
  if (model) {
    result = result.filter((car) =>
      car.model.toLowerCase() === model.toLowerCase()
    );
  }

  if (year && year !== 0) {
    result = result.filter((car) => car.year === Number(year));
  }

  if (fuel_type && fuel_type !== '') {
    result = result.filter((car) =>
      car.fuel_type.toLowerCase() === fuel_type.toLowerCase()
    );
  }

  if (limit) {
    result = result.slice(0, Number(limit));
  }

  return result;
}


/* 
//asta era pana la 2.28, pana a face responsive url
export async function fetchCars(filters: FilterProps) {
  return cars; 
}
  */
export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };

export const generateCarImageUrl = (car: CarProps, angle? : string) => {
    //key...
    const url = new URL("https://cdn.imagin.studio/getimage");
    const {make, year, model} = car;
    url.searchParams.append('customer', 'hrjavascript-mastery');

    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`;

}

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
  
    searchParams.set(type, value);
    
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`
    return newPathname;
    
}

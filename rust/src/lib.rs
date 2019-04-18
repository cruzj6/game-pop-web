#[macro_use] // Pull in all of the macros from this crate
extern crate serde_derive;
extern crate chrono;

#[macro_use]
mod utils;

// Pull in everything in wasm_bindgen::prelude so it can be invoked directly
use chrono::prelude::NaiveDateTime;
use chrono::DateTime;
use chrono::Datelike;
use chrono::Utc;
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[derive(Serialize, Deserialize)]
struct DataPoint {
    hits: String,
    date: String,
    __typename: String,
}

#[derive(Serialize)]
struct AverageForWeek {
    week: u32,
    average: u32,
}

fn get_timestamp_iso_week(timestamp: &String) -> u32 {
    // Convert the unix timestamp string to an i64
    let timestamp_i64: i64 = timestamp.parse::<i64>().unwrap();

    // Get the naive dateTime from the timestamp (no timezone applied, since this is a unix time)
    let naive_date_time: NaiveDateTime = NaiveDateTime::from_timestamp(timestamp_i64 / 1000, 0);

    // Now make it UTC
    let date_time: DateTime<Utc> = DateTime::from_utc(naive_date_time, Utc);

    // Get the iso week as a u32
    date_time.iso_week().week()
}

#[wasm_bindgen]
pub fn average_by_week(data: &JsValue) -> JsValue {
    let data_points: Vec<DataPoint> = data.into_serde().unwrap();

    // fold (reduce) the data points to a hash map of iso_week:[hits]
    let hits_for_week = data_points.iter().fold(
        HashMap::new(),
        |mut acc, data_point| -> HashMap<u32, Vec<u32>> {
            let iso_week = get_timestamp_iso_week(&data_point.date);

            // Parse the hits string as a u32
            let hits: u32 = data_point.hits.parse::<u32>().unwrap();

            // Add to the vector for this week (or create and add)
            let hits_vector: &mut Vec<u32> = acc.entry(iso_week).or_insert(Vec::<u32>::new());
            hits_vector.push(hits);

            // return the accumulator
            acc
        },
    );

    // Now create a vector so it can be converted to JsValue
    let averages_by_week = hits_for_week.iter().fold(
        Vec::<AverageForWeek>::new(),
        |mut acc, (weekRef, hits)| -> Vec<AverageForWeek> {
            let week = *weekRef;

            // Average the hits
            let total = hits
                .iter()
                .fold(0, |total, hits_number| total + hits_number);
            let average = total / hits.len() as u32;

            // Accumulate
            acc.push(AverageForWeek { week, average });
            acc
        },
    );

    match JsValue::from_serde(&averages_by_week) {
        Ok(a) => a,
        Err(_e) => JsValue::UNDEFINED,
    }
}

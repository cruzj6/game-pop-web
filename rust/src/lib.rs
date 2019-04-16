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
use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize)]
struct DataPoint {
    hits: String,
    date: String,
    __typename: String,
}

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, learn-wasm-rust!");
}

// #[wasm_bindgen]
// pub fn take_struct(data: &JsValue) {
//     let data_point: Vec<DataPoint> = data.into_serde().unwrap();
//     console_log!("Hello Test");
//     alert(&data_point[0].some_data)
// }

#[wasm_bindgen]
pub fn average_by_week(data: &JsValue) -> JsValue {
    let data_points: Vec<DataPoint> = data.into_serde().unwrap();

    for data_point in data_points.iter() {
        console_log!(
            "Processing date: {}, and hits: {}",
            data_point.date,
            data_point.hits
        );

        // Convert the unix timestamp string to an i64
        let timestamp: i64 = data_point.date.parse::<i64>().unwrap();

        // Get the naive dateTime from the timestamp (no timezone applied, since this is a unix time)
        let naive_date_time: NaiveDateTime = NaiveDateTime::from_timestamp(timestamp / 1000, 0);

        // Now make it UTC
        let date_time: DateTime<Utc> = DateTime::from_utc(naive_date_time, Utc);
        console_log!("{}", date_time.iso_week().week());
    }

    JsValue::from_serde(&data_points).unwrap()
}

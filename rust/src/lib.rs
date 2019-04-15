#[macro_use] // Pull in all of the macros from this crate
extern crate serde_derive;
extern crate chrono;

#[macro_use]
mod utils;

// Pull in everything in wasm_bindgen::prelude so it can be invoked directly
use chrono::prelude::NaiveDateTime;
use chrono::Utc;
use std::time::{Duration, SystemTime, UNIX_EPOCH};
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
        let timestamp: u64 = data_point.date.parse::<u64>().unwrap();
        let systemTime: SystemTime = UNIX_EPOCH + Duration::from_millis(timestamp);
        let dateTime: NaiveDateTime = NaiveDateTime::from(systemTime);
        console_log!("{}", dateTime.iso_week());
    }

    JsValue::from_serde(&data_points).unwrap()
}

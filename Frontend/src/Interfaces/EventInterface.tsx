interface Event {
  event_id: number;
  event_name: string;
  tag_line: string;
  event_poster: string;
  event_start_date: string;
  event_end_date: string;
  event_time: string;
  venue: string;
  event_price: number;
  event_description: string;
  QR_Code?: string;
  event_type?: string;
  event_limit?: number;
  }
export default Event;
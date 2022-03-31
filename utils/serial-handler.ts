class SerialHandler {
  reader: ReadableStreamDefaultReader;
  writer: WritableStreamDefaultWriter;
  encoder = new TextEncoder();
  decoder = new TextDecoder();
  async init() {
    if ("serial" in navigator) {
      try {
        const port = await (navigator as any).serial.requestPort();
        await port.open({ baudRate: 9600 }); // `baudRate` was `baudrate` in previous versions.

        this.writer = port.writable.getWriter();
        this.reader = port.readable.getReader();

        const signals = await port.getSignals();
        console.log(signals);
      } catch (err) {
        console.error("There was an error opening the serial port:", err);
      }
    } else {
      console.error(
        "Web serial doesn't seem to be enabled in your browser. Check https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility for more info."
      );
    }
  }
  async read(): Promise<string> {
    try {
      const readerData = await this.reader.read();
      return this.decoder.decode(readerData.value);
    } catch (err) {
      const errorMessage = `error reading data: ${err}`;
      console.error(errorMessage);
      return errorMessage;
    }
  }
}
export const serialHandler = new SerialHandler();

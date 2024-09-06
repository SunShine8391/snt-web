export default function Footer() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 bottom-0-0 z-20 border-t bg-background/95 backdrop-blur">
      <div className="text-center h-14 flex justify-center items-center">
        Copyright © {new Date().getFullYear()} S&T Biotech
      </div>
    </div>
  );
}

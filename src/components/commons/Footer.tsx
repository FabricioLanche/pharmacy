export default function Footer() {
  return (
    <footer style={{ padding: '1rem', borderTop: '1px solid #ccc', marginTop: '2rem', textAlign: 'center' }}>
      <small>&copy; {new Date().getFullYear()} Pharmacy App. All rights reserved.</small>
    </footer>
  );
}

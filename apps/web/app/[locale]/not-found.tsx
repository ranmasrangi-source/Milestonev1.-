import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container section">
      <h1>पृष्ठ भेटिएन / Page not found</h1>
      <p>तपाईंले खोजेको पृष्ठ अवस्थित छैन। / The page you are looking for does not exist.</p>
      <p>
        <Link href="/en">PheriNepal</Link> · <Link href="/ne">PheriNepal (नेपाली)</Link>
      </p>
    </section>
  );
}

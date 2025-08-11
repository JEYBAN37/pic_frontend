export const OrbserverFunction = (setActiveSection: (section: string) => void) => new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    },
    { threshold: 0.1 }
);

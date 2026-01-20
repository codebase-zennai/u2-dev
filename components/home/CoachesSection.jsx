import Image from 'next/image';

const coaches = [
    {
        id: 1,
        name: 'Sarah Thompson',
        role: 'Head Coach',
        image: '/images/coaches/team-1.jpg',
    },
    {
        id: 2,
        name: 'Jessica Novak',
        role: 'Fitness Coach',
        image: '/images/coaches/team-2.jpg',
    },
    {
        id: 3,
        name: 'Martina Rojas',
        role: 'Youth Coach',
        image: '/images/coaches/team-3.jpg',
    },
    {
        id: 4,
        name: 'Kevin O\'Connor',
        role: 'Strategy Coach',
        image: '/images/coaches/team-4.jpg',
    },
];

export default function CoachesSection() {
    return (
        <section className="section background-color-white">
            <div className="container-large">
                <div className="flex-center margin-bottom-64">
                    <p className="text-size-eyebrow margin-bottom-20">Our Coaches</p>
                    <h2 className="heading-style-h2">
                        Meet the Coaches Behind elysian
                    </h2>
                </div>
                <ul className="player_list">
                    {coaches.map((coach) => (
                        <li key={coach.id} className="player_item">
                            <div className="player_visual shadow-card margin-bottom-24">
                                <Image
                                    src={coach.image}
                                    alt={coach.name}
                                    fill
                                    className="img-cover"
                                    sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 400px"
                                />
                            </div>
                            <h3 className="heading-style-h3 margin-bottom-8">{coach.name}</h3>
                            <p className="text-size-medium text-color-darkgrey">{coach.role}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

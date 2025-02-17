import { motion } from "framer-motion";

const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
  >
    <h4 className="text-xl font-bold text-blue-600">{title}</h4>
    <p className="text-gray-600 mt-2">{description}</p>
  </motion.div>
);

export default FeatureCard;

import renderer from 'react-test-renderer';
import ProductDescription from '../description/productDescription.jsx';
import ProductDetails from '../index.jsx';

const testData = {
  id: 25176,
  campus: 'hr-sfo',
  name: 'Infinity Stone',
  slogan: 'Reality is often disappointing. That is, it was. Now, reality can be whatever I want.',
  description: 'The Infinity Stones are six immensely powerful stone-like objects tied to different aspects of the universe, created by the Cosmic Entities. Each of the stones possesses unique capabilities that have been enhanced and altered by various alien civilizations for millennia.',
  category: 'Accessories',
  default_price: '50000000.00',
  created_at: '2021-06-02T16:53:33.359Z',
  updated_at: '2021-06-02T16:53:33.359Z',
  features: [],
};

// describe('Product description', () => {
//   const component = renderer.create(ProductDescription({ testData }));
//   it('adds 1 and 1 to equal 2', () => {
//     console.log('Look here: ');
//   });
// });

test('slogan renders', () => {
  const component = renderer.create(ProductDescription({ testData }));
  let tree = component.toJSON();
  console.log(tree);
  expect(tree).toBe(tree);
});

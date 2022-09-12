const router = require("express").Router();
const { res, req } = require("express/lib/response");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "category not found" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

  // find all categories
  //TODO __________ be sure to include its associated Products
});

// router.get("/:id", async (req, res) => {
//   try {
//     const categoryById = await Category.findbyPk(req.params.id, {
//       include: [{ model: Product }],
//     });
//     if (!categoryById) {
//       res.status(404).json({ message: "id not found" });
//       return;
//     }
//     res.status(200).json(categoryById);
//   } catch (err) {
//     res.status(500).json(err);
//   }
//   // find one category by its `id` value
//   // be sure to include its associated Products
// });

router.get("/:id", async (req, res) => {
  const categoryById = await Category.findByPk(req.params.id);
  return res.json(categoryById);
});

router.post("/", async (req, res) => {
  try {
    const createCategory = await Category.create(req.body);
    if (!createCategory) {
      res.status(404).json({ message: "cannot create category" });
      return;
    }
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const categoryUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryUpdate) {
      res.status(404).json({ message: "category not found" });
      return;
    }
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.delete("/:id", async (req, res) => {
//   try {
//     const catergoryDelete = await Catergory.destroy(req.body, {
//       where: { id: req.params.id },
//     });
//     if (!catergoryDelete) {
//       res.status(404).json({ message: "unable to delete category" });
//       return;
//     }
//     res.status(200).json(categoryUpdate);
//   } catch (err) {
//     res.status(500).json(err);
//   }

//   // delete a category by its `id` value
// });

router.delete("/:id", async (req, res) => {
  const categoryDelete = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(categoryDelete);
});

module.exports = router;

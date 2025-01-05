const express = require("express");
const router = express.Router();
const Income = require("../models/incomeModel");
const Need = require("../models/needModel");
const Want = require("../models/wantModel");
const Investment = require("../models/investmentModel");
const Donation = require("../models/donationModel");

const calculateTotalAmount = (records) =>
  records.reduce((total, record) => total + record.amount, 0);

router.route("/").get(async (req, res) => {
  try {
    const incomes = await Income.find();
    const needs = await Need.find();
    const wants = await Want.find();
    const investments = await Investment.find();
    const donations = await Donation.find();

    const totalIncome = calculateTotalAmount(incomes);
    const totalSpentOnNeeds = calculateTotalAmount(needs);
    const totalSpentOnWants = calculateTotalAmount(wants);
    const totalSpentOnInvestments = calculateTotalAmount(investments);
    const totalSpentOnDonations = calculateTotalAmount(donations);

    const allocations = {
      needs: (totalIncome * 25) / 100,
      wants: (totalIncome * 25) / 100,
      investments: (totalIncome * 45) / 100,
      donations: (totalIncome * 5) / 100,
    };

    const remainingAllocations = {
      needs: allocations.needs - totalSpentOnNeeds,
      wants: allocations.wants - totalSpentOnWants,
      investments: allocations.investments - totalSpentOnInvestments,
      donations: allocations.donations - totalSpentOnDonations,
    };

    const summary = {
      income: {
        total: totalIncome,
        remaining:
          totalIncome -
          (totalSpentOnNeeds +
            totalSpentOnWants +
            totalSpentOnInvestments +
            totalSpentOnDonations),
      },
      needs: {
        allocated: allocations.needs,
        spent: totalSpentOnNeeds,
        remaining: remainingAllocations.needs,
      },
      wants: {
        allocated: allocations.wants,
        spent: totalSpentOnWants,
        remaining: remainingAllocations.wants,
      },
      investments: {
        allocated: allocations.investments,
        spent: totalSpentOnInvestments,
        remaining: remainingAllocations.investments,
      },
      donations: {
        allocated: allocations.donations,
        spent: totalSpentOnDonations,
        remaining: remainingAllocations.donations,
      },
    };

    res.render("home", { summary });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to retrieve financial data" });
  }
});

router
  .route("/incomes")
  .get(async (req, res) => {
    try {
      const incomes = await Income.find();
      res.render("income", { incomes });
    } catch (error) {
      console.error("Error fetching incomes:", error);
      res.status(500).json({ error: "Failed to retrieve income data" });
    }
  })
  .post(async (req, res) => {
    try {
      const { date, amount, description } = req.body;
      const incomeEntry = { date, amount, description };
      await Income.create(incomeEntry);
      res.redirect("/");
    } catch (error) {
      console.error("Error adding income entry:", error);
      res.status(500).json({ error: "Failed to add income entry" });
    }
  });

router
  .route("/needs")
  .get(async (req, res) => {
    try {
      const needs = await Need.find();
      res.render("need", { needs });
    } catch (error) {
      console.error("Error fetching needs:", error);
      res.status(500).json({ error: "Failed to retrieve need data" });
    }
  })
  .post(async (req, res) => {
    try {
      const { date, amount, description } = req.body;
      const needEntry = { date, amount, description };
      const newNeed = await Need.create(needEntry);
      res.json({ success: true, data: newNeed });
    } catch (error) {
      console.error("Error adding need entry:", error);
      res.status(500).json({ error: "Failed to add need entry" });
    }
  });

router
  .route("/wants")
  .get(async (req, res) => {
    try {
      const wants = await Want.find();
      res.render("want", { wants });
    } catch (error) {
      console.error("Error fetching wants:", error);
      res.status(500).json({ error: "Failed to retrieve want data" });
    }
  })
  .post(async (req, res) => {
    try {
      const { date, amount, description } = req.body;
      const wantEntry = { date, amount, description };
      await Want.create(wantEntry);
      res.redirect("/");
    } catch (error) {
      console.error("Error adding want entry:", error);
      res.status(500).json({ error: "Failed to add want entry" });
    }
  });

router
  .route("/investments")
  .get(async (req, res) => {
    try {
      const investments = await Investment.find();
      res.render("investment", { investments });
    } catch (error) {
      console.error("Error fetching investments:", error);
      res.status(500).json({ error: "Failed to retrieve investment data" });
    }
  })
  .post(async (req, res) => {
    try {
      const { date, amount, description } = req.body;
      const investmentEntry = { date, amount, description };
      await Investment.create(investmentEntry);
      res.redirect("/");
    } catch (error) {
      console.error("Error adding investment entry:", error);
      res.status(500).json({ error: "Failed to add investment entry" });
    }
  });

router
  .route("/donations")
  .get(async (req, res) => {
    try {
      const donations = await Donation.find();
      res.render("donation", { donations });
    } catch (error) {
      console.error("Error fetching donations:", error);
      res.status(500).json({ error: "Failed to retrieve donation data" });
    }
  })
  .post(async (req, res) => {
    try {
      const { date, amount, description } = req.body;
      const donationEntry = { date, amount, description };
      await Donation.create(donationEntry);
      res.redirect("/");
    } catch (error) {
      console.error("Error adding donation entry:", error);
      res.status(500).json({ error: "Failed to add donation entry" });
    }
  });

module.exports = router;
